import re
from typing import TypedDict
import os
import requests
import toml

PROJECT_TYPES_FOLDERS: dict[str, str] = {
    "mod": "main/mods",
    "datapack": "main/datapacks",
    "resourcepack": "main/resourcepacks",
    "shaderpack": "main/shaderpacks",
}

MATCHING_REGEX = r"Support all these creators, this would not exist without them!\n\n---\n\n(.*)\n\n---"

headers = {
    "User-Agent": "Conobi/ListProjects",
    "Accept": "application/json",
}


class Project(TypedDict):
    project_type: str
    platform: str
    name: str
    author: str
    url: str


project_list: dict[str, Project] = {}

if os.environ.get("CURSEFORGE_TOKEN") is None:
    raise Exception("CURSEFORGE_TOKEN not set")


def parse_folder(folder: str, project_type: str):
    """
    Parse a folder and add all projects to the project list
    """
    for file in os.listdir(folder):
        if file.endswith(".pw.toml"):
            with open(os.path.join(folder, file), "r") as toml_file:
                file_data = toml.load(toml_file)
            if "modrinth" in file_data["update"]:
                project_list[file_data["update"]["modrinth"]["mod-id"]] = {
                    "project_type": project_type,
                    "platform": "modrinth",
                }
            elif "curseforge" in file_data["update"]:
                project_list[
                    str(file_data["update"]["curseforge"]["project-id"])
                ] = {
                    "project_type": project_type,
                    "platform": "curseforge",
                }
            else:
                raise Exception(f"Unknown platform for {file}")


def query_builder(id_list: list[str]) -> str:
    """
    Build a query string for Modrinth API
    """
    return "ids=" + str(id_list).replace(" ", "").replace("'", '"')


def fetch_modrinth(modrinth_list: dict[str, Project]):
    """
    Fetching all Modrinth projects at once
    """
    project_ids = list(modrinth_list.keys())

    res = requests.get(
        f"https://api.modrinth.com/v2/projects?{query_builder(project_ids)}",
        headers,
    )
    res.raise_for_status()
    projects: list[dict] = res.json()

    # We get the team data
    team_ids = [project["team"] for project in projects]

    res = requests.get(
        f"https://api.modrinth.com/v2/teams?{query_builder(team_ids)}",
        headers,
    )
    res.raise_for_status()
    teams: list[list[dict]] = res.json()

    for team in teams:
        author = ""
        for member in team:
            if author:
                author += ", "
            author += member["user"]["username"]
        team_id = team[0]["team_id"]

        # Add author to each project
        for project in projects:
            if project["team"] == team_id:
                project["author"] = author

    for project in projects:
        project_list[project["id"]]["name"] = project["title"]
        project_list[project["id"]]["url"] = (
            "https://modrinth.com/"
            + project["project_type"]
            + "/"
            + project["slug"]
        )
        project_list[project["id"]]["author"] = project["author"]


def fetch_curseforge(curseforge_list: dict[str, Project]):
    """
    Fetching each Curseforge project one by one
    """
    for project_id, project in curseforge_list.items():
        res = requests.get(
            f"https://api.curseforge.com/v1/mods/{project_id}",
            headers=headers
            | {"x-api-key": os.environ.get("CURSEFORGE_TOKEN")},
        )
        res.raise_for_status()
        project_data: dict = res.json()

        project_list[project_id]["name"] = project_data["data"]["name"]
        project_list[project_id]["url"] = project_data["data"]["links"][
            "websiteUrl"
        ]
        project_list[project_id]["author"] = project_data["data"]["authors"][
            0
        ]["name"]


def build_project_line(project: Project, output: str):
    return output + (
        "- ["
        + project["name"]
        + "]("
        + project["url"]
        + ") by "
        + project["author"]
        + "\n"
    )


if __name__ == "__main__":
    for project_type, folder in PROJECT_TYPES_FOLDERS.items():
        parse_folder(folder, project_type)

    modrinth_list: dict[str, Project] = {
        project_id: project
        for project_id, project in project_list.items()
        if project["platform"] == "modrinth"
    }

    curseforge_list: dict[str, Project] = {
        project_id: project
        for project_id, project in project_list.items()
        if project["platform"] == "curseforge"
    }

    fetch_modrinth(modrinth_list)
    fetch_curseforge(curseforge_list)

    project_list = list(project_list.values())

    project_list.sort(
        key=lambda x: (x["platform"], x["project_type"], x["name"])
    )

    last_platform = ""
    last_project_type = ""
    output = ""

    for project in project_list:
        if project["platform"] != last_platform:
            output += f"### {project['platform'].title()}\n"
            last_platform = project["platform"]
        if project["project_type"] != last_project_type:
            output += f"#### {project['project_type'].title() + 's'}\n"
            last_project_type = project["project_type"]
        output = build_project_line(project, output)

if os.environ.get("OUTPUT_FILE") is not None:
    with open(os.environ.get("OUTPUT_FILE"), "r+") as file:
        file_content = file.read()
        legacy_list = re.search(
            MATCHING_REGEX, file_content, re.DOTALL
        ).groups()[0]
        file.seek(0)
        file.write(file_content.replace(legacy_list, output))
        file.truncate()
        file.close()

    print(output)

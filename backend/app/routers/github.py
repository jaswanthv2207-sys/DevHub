from fastapi import APIRouter, HTTPException
import requests

router = APIRouter(
    prefix="/github",
    tags=["GitHub"],
)

GITHUB_API = "https://api.github.com"


# ----------------------------------------
# Search Repositories
# ----------------------------------------
@router.get("/repositories")
def search_repositories(query: str):

    url = f"{GITHUB_API}/search/repositories?q={query}&per_page=10"

    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    data = response.json()

    repositories = []

    for repo in data["items"]:
        repositories.append(
            {
                "id": repo["id"],
                "name": repo["name"],
                "full_name": repo["full_name"],
                "description": repo["description"],
                "language": repo["language"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "owner": repo["owner"]["login"],
                "avatar": repo["owner"]["avatar_url"],
                "url": repo["html_url"],
            }
        )

    return repositories


# ----------------------------------------
# Repository Details
# ----------------------------------------
@router.get("/repositories/{owner}/{repo}")
def repository_details(owner: str, repo: str):

    url = f"{GITHUB_API}/repos/{owner}/{repo}"

    response = requests.get(url)

    if response.status_code == 404:
        raise HTTPException(
            status_code=404,
            detail="Repository not found.",
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    repo = response.json()

    return {
        "id": repo["id"],
        "name": repo["name"],
        "full_name": repo["full_name"],
        "description": repo["description"],
        "language": repo["language"],
        "stars": repo["stargazers_count"],
        "forks": repo["forks_count"],
        "watchers": repo["watchers_count"],
        "open_issues": repo["open_issues_count"],
        "default_branch": repo["default_branch"],
        "license": (
            repo["license"]["name"]
            if repo["license"]
            else None
        ),
        "topics": repo["topics"],
        "created_at": repo["created_at"],
        "updated_at": repo["updated_at"],
        "url": repo["html_url"],
        "owner": {
            "username": repo["owner"]["login"],
            "avatar": repo["owner"]["avatar_url"],
            "profile": repo["owner"]["html_url"],
        },
    }


# ----------------------------------------
# Search Developers
# ----------------------------------------
@router.get("/developers")
def search_developers(query: str):

    url = f"{GITHUB_API}/search/users?q={query}&per_page=10"

    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    data = response.json()

    developers = []

    for user in data["items"]:
        developers.append(
            {
                "github_id": user["id"],
                "username": user["login"],
                "avatar": user["avatar_url"],
                "profile": user["html_url"],
            }
        )

    return developers


# ----------------------------------------
# Developer Profile
# ----------------------------------------
@router.get("/developers/{username}")
def developer_profile(username: str):

    url = f"{GITHUB_API}/users/{username}"

    response = requests.get(url)

    if response.status_code == 404:
        raise HTTPException(
            status_code=404,
            detail="Developer not found.",
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    user = response.json()

    return {
        "github_id": user["id"],
        "username": user["login"],
        "name": user["name"],
        "bio": user["bio"],
        "company": user["company"],
        "location": user["location"],
        "blog": user["blog"],
        "email": user["email"],
        "followers": user["followers"],
        "following": user["following"],
        "public_repos": user["public_repos"],
        "public_gists": user["public_gists"],
        "avatar": user["avatar_url"],
        "profile": user["html_url"],
        "created_at": user["created_at"],
    }

@router.get("/developers/{username}/repositories")
def user_repositories(username: str):

    url = f"https://api.github.com/users/{username}/repos?per_page=100"

    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    repos = response.json()

    repositories = []

    for repo in repos:
        repositories.append(
            {
                "id": repo["id"],
                "name": repo["name"],
                "full_name": repo["full_name"],
                "description": repo["description"],
                "language": repo["language"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "watchers": repo["watchers_count"],
                "open_issues": repo["open_issues_count"],
                "default_branch": repo["default_branch"],
                "private": repo["private"],
                "url": repo["html_url"],
                "created_at": repo["created_at"],
                "updated_at": repo["updated_at"],
            }
        )

    return repositories

@router.get("/developers/{username}/followers")
def user_followers(username: str):

    url = f"https://api.github.com/users/{username}/followers?per_page=100"

    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    followers = response.json()

    result = []

    for user in followers:
        result.append(
            {
                "github_id": user["id"],
                "username": user["login"],
                "avatar": user["avatar_url"],
                "profile": user["html_url"],
            }
        )

    return result

@router.get("/developers/{username}/following")
def user_following(username: str):

    url = f"https://api.github.com/users/{username}/following?per_page=100"

    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API Error",
        )

    following = response.json()

    result = []

    for user in following:
        result.append(
            {
                "github_id": user["id"],
                "username": user["login"],
                "avatar": user["avatar_url"],
                "profile": user["html_url"],
            }
        )

    return result

@router.get("/trending")
def trending_repositories():

    url = "https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=20"

    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "GitHub API Error"}

    data = response.json()

    repositories = []

    for repo in data["items"]:
        repositories.append(
            {
                "id": repo["id"],
                "name": repo["name"],
                "full_name": repo["full_name"],
                "description": repo["description"],
                "language": repo["language"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "owner": repo["owner"]["login"],
                "avatar": repo["owner"]["avatar_url"],
                "url": repo["html_url"],
            }
        )

    return repositories

@router.get("/languages")
def languages():
    return [
        "Python",
        "JavaScript",
        "TypeScript",
        "Java",
        "C",
        "C++",
        "C#",
        "Go",
        "Rust",
        "PHP",
        "Ruby",
        "Swift",
        "Kotlin",
        "Dart",
        "Scala",
        "R"
    ]
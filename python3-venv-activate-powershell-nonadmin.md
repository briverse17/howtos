---
title: "How to activate Python3 venv in Windows PowerShell (no admin)"
description: "Fix the PowerShell execution policy error when activating a Python virtual environment without administrator privileges."
category: "Python"
tags: [python, windows, powershell, virtualenv, permissions]
date: 2024-01-01
status: published
---
# How to activate Python3 virtualenv in Windows Powershell without admin privilege

Run the below command

```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then

```shell
<venv path>\Scripts\Activate.ps1
```

# How to update VSCode automatically in Ubuntu 20.04

Create a script file, for example `update_vscode.sh`

```shell
touch ~/update_vscode.sh
```

Copy and paste the following code into the file

```shell
DOWNLOAD_DIR="/tmp"
DOWNLOAD_URL="https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"

echo "Getting stable VSCode .deb distribution"
wget -q --show-progress -nc -O "$DOWNLOAD_DIR/code_stable.deb" "$DOWNLOAD_URL"

if [ -f "$DOWNLOAD_DIR/code_stable.deb" ]; then
 echo "Installing stable VSCode"
 apt install "$DOWNLOAD_DIR/code_stable.deb/"
 echo "Cleaning up..."
 rm "$DOWNLOAD_DIR/code_stable.deb"
fi
```

Modify its permission so that it becomes executable

```shell
sudo chmod +x ~/update_vscode.sh
```

Execute

```shell
sudo ~/update_vscode.sh
```

---
You can choose to add it to `crontab` as well

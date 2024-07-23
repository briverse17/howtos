# How to use Cloudflare WARP on Linux

## Check your `warp-cli` version

```shell
$ warp-cli --version
warp-cli 2024.4.133
```

The previous version `2023.x.yyyy` may still be around and some how you installed it. There are slight differences in command syntax between the two binaries.

## Connect

First, register your client

```shell
warp-cli registration new
```

<details>
    <summary>
        <code>2023.x.yyyy</code> version
    </summary>

```shell
warp-cli register
```

</details>

Then, connect

```shell
warp-cli connect
```

## Disconnect

Delete registration

```shell
warp-cli registration delete
```

<details>
    <summary>
        <code>2023.x.yyyy</code> version
    </summary>

```shell
warp-cli delete
```

</details>

Disconnect

```shell
warp-cli disconnect
```
---
If you encounter network problems after disconnecting WARP. Try restarting the `NetworkManager`:

```shell
sudo systemctl restart NetworkManager
```

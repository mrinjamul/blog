---
title: Create and Manage services in Termux
author: Injamul Mohammad Mollah
date: 2021-02-09 19:10:00 +0530
categories: [Blogging, Tutorial]
tags: [termux, unix service, commandline]
---

In this post, I will show you how to create and manage services in Termux.

    Termux is an Android terminal emulator and Linux environment app
    that works directly with no rooting or setup required.

Termux uses `runit` as its init system.

    “runit is a cross-platform Unix init scheme with service supervision,
    a replacement for sysvinit, and other init schemes.”

```sh
pkg install termux-services
```

Then restart Termux so that the service-daemon is started.

Now let's create a service,

I am going create a service for [gogs](https://github.com/gogs/gogs) (a git service).

All termux services are located at `$PREFIX/var/service` (`$PREFIX=$HOME/../usr`).

Create a folder for the service and name it as the application name. In my case that is `gogs`.

```sh
mkdir $PREFIX/var/service/gogs
```

Then create a symbolic link with termux-logger.

```sh
mkdir $PREFIX/var/service/gogs/log

ln -sf $PREFIX/share/termux-services/svlogger $PREFIX/service/gogs/log/run
```

Now write the service file for the application with the below content,

```sh
touch $PREFIX/var/service/gogs/run
```

```sh
# Gogs service for termux
#!/data/data/com.termux/files/usr/bin/sh
exec gogs web 2>&1
```

You can get help to write runit service here.

make it executable,

```sh
chmod +x $PREFIX/var/service/gogs/run
```

Now restart Termux and run,

```sh
sv up gogs
```

It will work smoothly.

Here are some useful commands about termux services,

To enable service to start at boot,

```sh
sv-enable <service>
```

To disable from starting at boot,

```sh
sv-disable <service>
```

To start a service,

```sh
sv up <service>
```

To stop a service,

```sh
sv down <service>
```

**Bonus Topic: Manage proot(s) in Termux**

You can install multiple Linux based distributions using proot-distro ,

Lists supported distributions and their installation status,

```sh
proot-distro list
```

To install a distribution,

```sh
proot-distro install <distro name>
```

To login into a distribution,

```sh
proot-distro login <distro name>
```

Delete a distribution from Termux,

```sh
proot-distro remove <distro name>
```

To reinstall a specified distribution,

```sh
proot-distro reset <distro name>
```

To backup a distribution,

```sh
proot-distro backup <distro name>
```

To restore a distribution from backup,

```sh
proot-distro restore <distro name>
```

This post also published on [Medium](https://medium.com/tech-thinker/create-and-manage-services-in-termux-linux-based-android-terminal-5120c4694199).

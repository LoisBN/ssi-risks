package main

import (
	"fmt"
	_ "fmt"
	_ "log"
	_ "net"
	"os"
	_ "os"
	"os/exec"

	"github.com/urfave/cli"
)

func main()  {
    app := cli.NewApp()
    app.Name = "SSI Launcher"
    app.Usage = "Let's you launch the app easily"
    app.Version = "1.0.0"

    myFlags := []cli.Flag{
        &cli.StringFlag{
            Name: "host",
        },
    }

    app.Commands = []cli.Command{
        {
            Name: "launch",
            Usage: "Launch all the services",
            Flags: myFlags,
            Action: func(c *cli.Context) error {
                fmt.Println("------Lolo is launching the services for you------\n")
                
                cmd := exec.Command("ls","-l")
                cmd.Path = "/"
                cmd.Stdout = os.Stdout
                cmd.Run()
                fmt.Println("\n------ done with love ------")
                return nil
            },
        },
    }

    err := app.Run(os.Args)
    if err != nil {
        panic(err.Error())
    }
}
package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/urfave/cli"
)

func main()  {
    app := cli.NewApp()
    app.Name = "Website lookup CLI"
    app.Usage = "Let's you query IPs,CNAMEs,MX records and Name Server"

    myFlags := []cli.Flag{
        &cli.StringFlag{
            Name: "host",
        },
    }

    app.Commands = []cli.Command{
        {
            Name: "ns",
            Usage: "Looks up the name server for a particular host",
            Flags: myFlags,
            Action: func(c *cli.Context) error {
                fmt.Println("------Lolo is fetching the ns of this host for you------\n")
                ns,err := net.LookupNS(c.String("host"))
                if err != nil {
                    log.Fatalln(err.Error())
                }
                for _,val := range ns {
                    fmt.Println("--> ",val.Host)
                }

                fmt.Println("\n------ done with love ------")
                return nil
            },
        },
        {
            Name: "ip",
            Usage: "Looks up the ip for a particular host",
            Flags: myFlags,
            Action: func(c *cli.Context) error {
                fmt.Println("------Lolo is fetching the ip of this host for you------\n")
                ip,err := net.LookupIP(c.String("host"))
                if err != nil {
                    log.Fatalln(err.Error())
                }
                for _,val := range ip  {
                    fmt.Println("--> ",val.String())
                }
                fmt.Println("\n------ done with love ------")
                return nil
            },
        },
    }
    err := app.Run(os.Args)
    if err != nil {
        log.Fatalln(err.Error())
    }
}
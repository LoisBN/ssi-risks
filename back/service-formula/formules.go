package main

import "fmt"

func calculateSynthesis(value [][]map[string]map[string]interface{}) int {
    //var sum int
    const x int = 3
    for _,val := range value {
        for _,val2 := range val {
            for _,answer := range val2 {
                fmt.Println(answer)
            }
        }
    }
    return x
}

func calculateField(value []map[string]interface{}) int {
    const x int = 12
    for _,val := range value {
        fmt.Println(val)
        for _,val := range val {
            fmt.Println(val)
        }
    }
    return x
}
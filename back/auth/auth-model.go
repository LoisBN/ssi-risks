package main

import "time"

type Profile struct{
    Username string
    Email string
    Password string
    Admin bool
    Date time.Time
}

type LoginFormData struct{
    Identifier string
    Password string
}
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/go-redis/redis/v7"
	"github.com/gorilla/mux"
)

func NewProject(w http.ResponseWriter,req *http.Request) {
    var u Project
	bs,err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w,err.Error(),http.StatusInternalServerError)
		return
	}
	err = json.Unmarshal(bs,&u)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w,err.Error(),http.StatusInternalServerError)
		return
	}
	client := redis.NewClient(&redis.Options{
		Addr: ":6379",
		Password: "",
		DB: 0,
	})
	fmt.Println(u)
	////x := `{"`+u.Name+`":"`+u.Initiator+`"}`
	client.HSet(u.Name,"name",u.Name,"initiator",u.Initiator)
}

func GetAll(w http.ResponseWriter,req *http.Request) {
	client := redis.NewClient(&redis.Options{
		Addr: ":6379",
		Password: "",
		DB: 0,
	})
	var p = make(map[string]interface{})
	for _,key := range client.Keys("*").Val() {
		p[key] = client.HGetAll(key).Val()
	}

	fmt.Println(p)
	json.NewEncoder(w).Encode(&p)
	
}

func GetProject(w http.ResponseWriter,req *http.Request)  {
	params := mux.Vars(req)
	name := params["name"]

	client := redis.NewClient(&redis.Options{
		Addr: ":6379",
		Password: "",
		DB: 0,
	})
	var p = make(map[string]interface{})
	for _,key := range client.Keys(name).Val() {
		p[key] = client.HGetAll(key).Val()
	}

	fmt.Println(p)
	json.NewEncoder(w).Encode(&p)
}

func UpdateProject(w http.ResponseWriter,req *http.Request)  {
	params := mux.Vars(req)
	name := params["name"]

	client := redis.NewClient(&redis.Options{
		Addr: ":6379",
		Password: "",
		DB: 0,
	})
	
	if client.Get(name) != nil {

	var u Project
	bs,err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	err = json.Unmarshal(bs,&u)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	client.Del(name)
	client.HSet(u.Name,"initiator",u.Initiator,"name",u.Name)
	}
}

func DeleteProject(w http.ResponseWriter,req *http.Request)  {
	params := mux.Vars(req)
	name := params["name"]

	client := redis.NewClient(&redis.Options{
		Addr: ":6379",
		Password: "",
		DB: 0,
	})

	client.Del(name)
}
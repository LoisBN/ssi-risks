package main

type Project struct{
	Name string
	Initiator string
	Homologation string
	BesoinSec string
	Impacts string
	Menaces string
	ImportanceVuln string
}

type Form map[string]Question

type Question struct {
	Question string
	Reponse  string
}
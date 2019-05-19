// main.go
package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "strconv"
    "strings"
    "encoding/json"
    "github.com/Indonesian-Numeral-Spellers/spell"
    "github.com/Indonesian-Numeral-Spellers/read"
)

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")
}

func getSpell(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Access-Control-Allow-Origin", "*")

    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    key := r.URL.Query().Get("number")
    number,err := strconv.Atoi(key)
    if(err == nil && number <= 2000000000){
    	type Answer struct {
		    Status string
		    Text string
		}

		answer := &Answer{Status: "Ok",Text: strings.TrimSpace(spell.Spell(number))}
		b, err := json.Marshal(answer)
		if(err == nil){
    		fmt.Fprintf(w, string(b))
    	}
	} else {
    	type Answer struct {
		    Status string
		    Text string
		}
		answer := &Answer{Status: "Error",Text: ""}
		b, err := json.Marshal(answer)
		if(err == nil){
   			fmt.Fprintf(w, string(b))
    	}
	}
}

func getRead(w http.ResponseWriter, r *http.Request){

    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if(r.Method == "POST"){
	    key := r.URL.Query().Get("text")
    	type Answer struct {
		    Status string
		    Number int
		}
		nominal := read.Read(key,9)
		if(nominal == -1){
			answer := &Answer{Status: "Error",Number: -1}
			b, err := json.Marshal(answer)
			if(err == nil){
	    		fmt.Fprintf(w, string(b))
	    	}
		} else {
			answer := &Answer{Status: "Ok",Number: nominal}
			b, err := json.Marshal(answer)
			if(err == nil){
	    		fmt.Fprintf(w, string(b))
	    	}
		}
	} 
}
func handleRequests() {

    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/spell", getSpell).Methods("GET", "OPTIONS")
    myRouter.HandleFunc("/read",getRead)
    log.Fatal(http.ListenAndServe(":8030", myRouter))
}

func main() {
    handleRequests()
}
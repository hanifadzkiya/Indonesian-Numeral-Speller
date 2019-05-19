package read

import "regexp"
import "strings"

var failed int
func getUnit(x string) int {
	if(x == "se" || x == "satu"){
		return 1
	} else if(x == "dua"){
		return 2
	} else if(x == "tiga"){
		return 3
	} else if(x == "empat"){
		return 4
	} else if(x == "lima"){
		return 5
	} else if(x == "enam"){
		return 6	
	} else if(x == "tujuh"){
		return 7
	} else if(x == "delapan"){
		return 8
	} else if(x == "sembilan"){
		return 9
	} else if(x == "" || x == "nol"){
		return 0
	} else {
		failed = -1
		return -1;
	}
}

func pow(x int,y int) int {
	var answer int
	answer = 1
	for i := 1;i <= y;i++ {
		answer *= x
	}
	return answer
}

func getMiddleUnit(x string,idx int) int{
	var re_string string
	if(idx == 0){
		return getUnit(strings.TrimSpace(x))
	}
	if(idx == 2){
		re_string = "ratus"
	} else {
		re_string = "(.*)belas"
		regex := regexp.MustCompile(re_string)
		if(regex.MatchString(x)){
			matches := regex.FindStringSubmatch(x)
			return getUnit(strings.TrimSpace(matches[1])) + 10
		}
		re_string = "puluh"
		//Kasus khusus belas
	}
	re_string = "(.*)" + re_string + "(.*)"
	regex := regexp.MustCompile(re_string)
	if(regex.MatchString(x)){
		matches := regex.FindStringSubmatch(x)
		return pow(10,idx) * getUnit(strings.TrimSpace(matches[1])) + getMiddleUnit(matches[2],idx-1)
	} else {
		return getMiddleUnit(x,idx-1)
	}
}

func Read(x string,idx int) int{
	var re_string string
	var answer int
	failed = 0
	if(idx == 0){
		return getMiddleUnit(strings.TrimSpace(x),2)
	}
	if(idx == 9){
		re_string = "milyar"
	} else if(idx == 6){
		re_string = "juta"
	} else if(idx == 3){
		re_string = "ribu"
	}
	re_string = "(.*)" + re_string + "(.*)"
	regex := regexp.MustCompile(re_string)
	if(regex.MatchString(x)){
		matches := regex.FindStringSubmatch(x)
		answer = getMiddleUnit(strings.TrimSpace(matches[1]),2) * pow(10,idx) + Read(matches[2],idx-3)
		if(failed == -1){
			return -1
		} else {
			return answer
		}
	} else {
		answer = Read(x,idx-3)
		if(failed == -1){
			return -1
		} else {
			return Read(x,idx-3)
		}
	}
}


package spell

func getNominal(number int) string {
	var result string
	nominal := [12] string {"", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"}
	result = ""
	if(number < 12) {
		result = " " + nominal[number]
	}	else if (number <20) {
		result = getNominal(number - 10) +  " belas"
	} else if (number < 100) {
		result = getNominal(number/10)+" puluh"+ getNominal(number % 10);
	} else if (number < 200) {
		result = " seratus" + getNominal(number - 100);
	} else if (number < 1000) {
		result = getNominal(number/100) + " ratus" + getNominal(number % 100);
	} else if (number < 2000) {
		result = " seribu" + getNominal(number - 1000);
	} else if (number < 1000000) {
		result = getNominal(number/1000) + " ribu" + getNominal(number % 1000);
	} else if (number < 1000000000) {
		result = getNominal(number/1000000) + " juta" + getNominal(number % 1000000);
	} else if (number < 1000000000000) {
		result = getNominal(number/1000000000) + " milyar" + getNominal(number % 1000000000);
	}
	return result
} 
func Spell(number int) string {
	var result string
	if(number == 0){
		result = "nol"
	} else {
		result = getNominal(number)
	}
	return result
}

// https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
export function getYIQ(hexcolor: string){
	hexcolor = hexcolor.replace("#", "")
	var r = parseInt(hexcolor.substring(0,2), 16)
	var g = parseInt(hexcolor.substring(2,4), 16)
	var b = parseInt(hexcolor.substring(4,6), 16)
	var yiq = ((r*299) + (g*587) + (b*114)) / 1000
	return yiq
}
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const heightRatio = windowHeight/844;
export const widthRatio = windowWidth/390;

export const baseApiUrl = "https://inertiafit-f67b79e42b1b.herokuapp.com/"

// "https://inertiafit-f67b79e42b1b.herokuapp.com/"
// http://192.168.0.15:3000/

export function formattedDate() {
    let currentDate = new Date();

    // Get the individual components of the date
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let day = currentDate.getDate().toString().padStart(2, '0');
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours().toString().padStart(2, '0');

    // Format the date as MM-DD-YYYY HH:MM
    let formattedDate = `${month}-${day}-${year} ${hours}`;

    return formattedDate
}
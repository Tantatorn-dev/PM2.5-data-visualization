export default function getData (){
    return fetch("https://tgr2020-quiz.firebaseio.com/quiz/sensor/team32.json?fbclid=IwAR0po1ZfOZ4ziwvwt8Qvyw_62A9ezD0F4MrIzVqgXsXWK4X8QiUd_C4CvoU")
    .then(res=>res.json())
    .then(res=>{console.log(res)})
    .catch(()=>{console.log("error fetching data")})
}
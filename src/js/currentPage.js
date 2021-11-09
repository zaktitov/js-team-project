export default function myCurrentPage(film) {
    let myCurrentPageFilmList = []    
    localStorage.setItem('CurrentPageFilmList', '')
    myCurrentPageFilmList.push(film)
    localStorage.setItem('CurrentPageFilmList', JSON.stringify(myCurrentPageFilmList))
    //myStartPageFilmList = JSON.parse(localStorage.getItem('CurrentPageFilmList'))
 }
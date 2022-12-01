import React from "react";
import axios from "axios"
import { useState } from "react";
import "./page.css"
const Page = () => {

    const [search, setsearch] = useState("")
    const [alldata, setallData] = useState([])
    const[avialble,setavailable]=useState(true)

    const getphoto = () => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=FRSd1YsBcqO1vLKf_AKJTlNrVho1XMfYaR4rhPy-d8w`)
            .then((res) => {
                const myData = res.data.results
                setallData(myData)
            })
            .catch(err => {
                console.log(err)
            })

    }
    let bookmark = []
    function addbookmark(e,url) {
        bookmark.push(url)
    }

    const showmarked=()=>{
        setallData(bookmark)
        setavailable(!avialble)
    }

    console.log(bookmark)
    return (
        <>
            <div id="main-container">
                <div id="heading">
                    <h1>React photo search</h1>
                    <button onClick={showmarked} id="bookmark-btn">Bookmarks</button>
                </div>
                <div id="search">
                    <input id="search-bar" type="text" placeholder="search by name"
                        onChange={(e) => setsearch(e.target.value)}
                        
                    />
                    <button onClick={getphoto} id="search-btn">search</button>
                </div>

                <div id="dispay-box">
                    {alldata.map((data) => {
                        return (
                            <>
                             {avialble?<div key={data.id} id="images">
                                    <img onClick={(e)=>addbookmark(e,data.urls.small)} src={data.urls.small} />
                                    <p className="click-add">Click to Bookmark</p>
                                </div>
                                :
                                <img src={data}/>

                             }   
                            </>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
export default Page
import "./App.css"
import {BrowserRouter, NavLink, Route, Router, Routes, useNavigate} from 'react-router-dom';
import {SidebarData} from "./components/SidebarData";
import LiveMatches from "./components/LiveMatches";
import Table from "./components/Table";
import LiveTable from "./components/LiveTable";
import LoginPage from "./components/LoginPage";
import About from "./components/About";
import Settings from "./components/Settings";
import {SignUp} from "./components/SignUp";
import {StartMatch} from "./components/StartMatch";
import {sendApiGetRequest, sendApiGetRequestWithParams} from "./ApiRequests";
import {useEffect, useState} from "react";


function App() {


    return (
        <div>
            <div className='TitleBar'>Football Website</div>
            <BrowserRouter>
                <div className='container'>
                    <div className='Sidebar'>
                        <ul className='SidebarList'>
                            {SidebarData.map((item, key) => {
                                return (
                                    <>
                                        <li key={key} className="SidebarRow">
                                            <NavLink to={item.link} className="NavRow">
                                                <div id='icon'>{item.icon}</div>
                                                <div id='title'>{item.title}</div>
                                            </NavLink>
                                        </li>
                                    </>

                                )
                            })}
                        </ul>
                    </div>
                    <Routes>
                        <Route path={"/live-matches"} element={<LiveMatches/>}/>
                        <Route path={"/table"} element={<Table/>}/>
                        <Route path={"/live-table"} element={<LiveTable/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/about"} element={<About/>}/>
                        <Route path={"/settings"} element={<Settings/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>
                        <Route path={"/start-match"} element={<StartMatch/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
            )
        </div>
    );
}

export default App;
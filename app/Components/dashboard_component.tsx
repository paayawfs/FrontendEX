import React from "react";


export default function Dashboard_component({ title, value } : { title: string, value: number }) {

    return(
         <div className={"w-60 h-40 bg-gray-200 drop-shadow-xl drop-shadow-[#FC5DE7] border-[#FC5DE7] border-4 rounded-2xl text-center"}>
             <p className={"text-black text-lg p-5"}>{title}</p>
             <p className={"text-xl text-black p-4 font-bold "}>{value + "₵"} </p>

         </div> );
}
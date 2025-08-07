import Image from "next/image";

export default function Login_page(){
    return (
        <div>
        <h1 className={"text-3xl font-bold text-center text-[#363B64]  p-10 "}>Login</h1>
            <div className="w-180 h-100 flex ">
                <div className={" w-1/2 h-full bg-gray-200  "}>
                    <form className={"flex flex-col items-center gap-4 p-20"}>
                        <input type="text" placeholder="Username" className={"border border-gray-300 bg-white rounded p-2 w-64"} />
                        <input type="password" placeholder="Password" className={"border border-gray-300 bg-white rounded p-2 w-64"} />
                        <button type="submit" className={"bg-blue-500 text-white rounded text-center p-2 w-64 hover:bg-blue-600"}>Login</button>
                        <p className={"text-gray-600 mt-1"}>Dont have an account? <a href="signup_page.tsx" className={"text-blue-500 hover:underline"}>Register</a></p>
                    </form>
                </div>
                <div className={" w-1/2 h-full bg-purple-300 p-18 "}>
                    <p className={"justify-left  text-[#363B64] text-4xl font-bold  max-w-xs"}> Expense <br />Tracker App </p>
                    <Image className={""} src={"/Resources/walletImage.png"} alt={"Wallet image"} width={120} height={120} />
                </div>
            </div>
        </div>
    );

}
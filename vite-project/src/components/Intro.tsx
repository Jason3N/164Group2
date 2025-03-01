import { Link } from "react-router-dom";
import BlocklyComponent from "./Blockly";


const Intro: React.FC = () => {
    return (
        <>
        <div>
            <div className = "ml-16 text-3xl mt-10 mb-10">
                <Link to="/">Go Back Home?</Link>
                <div>Sandbox Page</div>
            </div>
            <div className = 'ml-16'>
                <BlocklyComponent/>
            </div>
            <div className = "mt-12 flex flex-col">
                <div className = "ml-16">
                Result:
                </div>
                <div className = "ml-16 border-black border-2 w-4/6 h-40">
                    json results will come here
                </div>
            </div>
        </div>
        </>
    )
}

export default Intro;
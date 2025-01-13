import { useNavigate } from 'react-router-dom';

type Props = {
    color: string;
    icon: string;
    title: string;
    textColor?: string;
}

export default function CategoryLayoutHeader({ color, icon, title, textColor = "white" }: Props) {
    const navigate = useNavigate();

    return (
        <header
            className="flex items-center justify-center relative p-4"
            style={{ backgroundColor: color }}
        >
            <div className="flex items-center gap-[1vw]">
                <img src={icon} alt={title} className="w-[6vh] h-[6vh]" />
                <h1
                    className={`text-[1.5rem] font-bold`}
                    style={{ color: textColor }} // Default to white if textColor is not provided
                >
                    {title}
                </h1>
            </div>
            <button
                type="button"
                className="absolute top-[10px] right-[10px] w-[30px] h-[30px] border-[2px] border-white rounded-full bg-transparent text-white flex items-center justify-center text-[15px] font-normal hover:bg-gradient-to-r hover:from-white hover:to-[#ffcccc] hover:text-[#E24831] hover:scale-110 active:scale-95 transition-transform"
                onClick={() => navigate("/")}
            >
                ✖
            </button>
        </header>
    )
}

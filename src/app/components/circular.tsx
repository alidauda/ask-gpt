export default function Circular() {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (75 / 100 * circumference);
    
    return (
       <div className=" bg-transparent text-red-700">

         <svg className="rotate border-0" width="50" height="50" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle
                cx="25"
                cy="25"
                r={radius}
                fill="transparent"
                stroke="#B0578D"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
                
        </svg>
       </div>
    );
}

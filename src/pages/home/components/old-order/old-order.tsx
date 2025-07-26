import { useNavigate } from "react-router-dom"

export const OldOrder = () => {
    const navigate = useNavigate()
    return (
        <div className="space-y-3">
            <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 p-2" onClick={() => navigate("/dashboard/new-order")}>
                <div className="flex items-center justify-between">
                    <h1 className="text-blue-950 text-base font-bold leading-tight">Afruz to'yxonasi</h1>
                    <h3 className="text-blue-950 text-base font-semibold">08.04.2025 10:30</h3>
                </div>
            </div>
            <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 p-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-blue-950 text-base font-bold leading-tight">Azizbek to’yxonasi</h1>
                    <h3 className="text-blue-950 text-base font-semibold">16.04.2025 10:30</h3>
                </div>
            </div>
        </div>
    )
}
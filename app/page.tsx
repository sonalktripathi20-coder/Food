import React from 'react';

export default function Home() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 flex items-center justify-center text-white text-3xl shadow-xl">
                🍱
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                FoodConnect <span className="text-amber-500">Bharat</span>
            </h1>

            <p className="text-lg text-slate-600 font-medium">
                Connect Food. Connect People. Reduce Waste.
            </p>

            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                A map-first food redistribution platform designed specifically for Indian communities, connecting surplus food from homes, weddings, restaurants, bhandaras, and community kitchens with beneficiaries, volunteers, and NGOs.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
                <a
                    href="/index.html"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg transition flex items-center space-x-2"
                >
                    <span>🗺️ Open Interactive Application</span>
                </a>
            </div>
        </div>
    );
}

import React from 'react';

export default function TestComponent() {
    return (
        <div className="p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-primary mb-4">Testing Tailwind CSS</h2>
            <p className="text-gray-700 mb-4">
                If you can see this text in gray and the heading in blue, Tailwind is working!
            </p>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Color Tests:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-primary text-white p-4 rounded-lg text-center">Primary</div>
                    <div className="bg-secondary text-white p-4 rounded-lg text-center">Secondary</div>
                    <div className="bg-dark text-white p-4 rounded-lg text-center">Dark</div>
                    <div className="bg-light text-dark p-4 rounded-lg text-center">Light</div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg text-center">Blue-500</div>
                    <div className="bg-green-500 text-white p-4 rounded-lg text-center">Green-500</div>
                    <div className="bg-red-500 text-white p-4 rounded-lg text-center">Red-500</div>
                    <div className="bg-gray-800 text-white p-4 rounded-lg text-center">Gray-800</div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Spacing & Layout:</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-primary/20 p-2 rounded">p-2</div>
                    <div className="bg-primary/20 p-4 rounded">p-4</div>
                    <div className="bg-primary/20 p-6 rounded">p-6</div>
                    <div className="bg-primary/20 p-8 rounded">p-8</div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Typography:</h3>
                <p className="text-xs mb-1">text-xs</p>
                <p className="text-sm mb-1">text-sm</p>
                <p className="text-base mb-1">text-base</p>
                <p className="text-lg mb-1">text-lg</p>
                <p className="text-xl mb-1">text-xl</p>
                <p className="text-2xl mb-1">text-2xl</p>
            </div>

            <div className="text-center mt-8">
                <a href="#" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">
                    Test Button
                </a>
            </div>
        </div>
    );
} 
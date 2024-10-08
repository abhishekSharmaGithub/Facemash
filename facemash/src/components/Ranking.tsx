import React from 'react'


interface SessionStorageItem {
    key: string;
    value: string;
}
interface sessionStorageProps {
    SessionStorageArray: SessionStorageItem[],
    imageDir: string
}
const Ranking:React.FC<sessionStorageProps> = ({SessionStorageArray, imageDir}) => {
  return (
    <div className="container mx-auto p-4 mt-12">
    <h1 className="text-3xl font-extrabold mb-6 text-center text-darkRed">Ranking</h1>
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full">
            <thead>
                <tr className="bg-darkRed text-white">
                    <th className="px-6 py-4 border-b border-gray-300 text-left text-sm font-semibold uppercase">Rank</th>
                    <th className="px-6 py-4 border-b border-gray-300 text-left text-sm font-semibold uppercase">Image</th>
                    <th className="px-6 py-4 border-b border-gray-300 text-left text-sm font-semibold uppercase">Elo</th>
                </tr>
            </thead>
            <tbody>
                {SessionStorageArray.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                        <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium text-gray-700">{index + 1}</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm">
                            <img
                                src={`${imageDir}${item.key}`}
                                alt={item.key}
                                className="w-16 h-16 object-cover rounded-full border border-gray-200 shadow-md"
                            />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

  )
}

export default Ranking
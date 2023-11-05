import { DocumentIcon } from "@heroicons/react/24/outline";

export default function RecentQueries({ queries }) {
  return (
    <div className="w-full h-full p-5 overflow-hidden">
      <div className="h-full w-full bg-white rounded-lg p-5 shadow">
        <div className="flex flex-col space-y-2 p-5 w-full h-[770px] bg-easy-blue-200 rounded-lg items-center overflow-y-scroll">
          <p className="font-bold mb-5">Vorherige Zusammenfassungen</p>
          {queries.map((query, index) => (
            <div
              key={index}
              className="w-[250px] min-h-[50px] rounded-lg flex items-center justify-start space-x-5 hover:bg-easy-blue-600 transition-all duration-200 ease-in-out"
            >
              <DocumentIcon className="ml-2 w-6 h-6" />
              <p className="text-black font-thin">{query}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

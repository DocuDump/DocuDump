import { getAllUserNames } from "@/db";

export default async function Home() {
    let userNames = getAllUserNames();
    return (
        <main>
            <p className="font-mono font-bold">hello world</p>
            <ol>
                {userNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ol>
        </main>
    );
}

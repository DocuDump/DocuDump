import { getAllUserNames, getAllUsers } from "@/db";

export default async function Home() {
    return (
        <main>
            <p className="font-bold">hello world</p>
            <p className="font-mono">getAllUserNames():</p>
            <ol>
                {getAllUserNames().map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ol>
            <p className="font-mono">getAllUsers():</p>
            <ol>
                {getAllUsers().map((user, index) => (
                    <li key={index}>
                        {user.name}: {user.email ?? "email is null"}
                    </li>
                ))}
            </ol>
        </main>
    );
}

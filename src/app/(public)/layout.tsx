
import type { Metadata } from "next";

// import { Footer } from "@/widgets/footer";
// import { Background } from "@/shared/ui/background";

import "../globals.scss";
import { Header } from "@/widgets/header";
// import { Footer } from "@/widgets/footer";
import { Contacts } from "@/widgets/contacts";
import { Footer } from "@/widgets/footer";


export const metadata: Metadata = {
    title: "Isolation Quest | Квесты в реальности | Дубна",
    description:
        "Хотелось бы Вам получить возможность почувствовать себя главным героем фильма? Перенестись из современной реальности в череду захватывающих приключений и таинственных историй? Isolation – это то, что перенесет Вас в абсолютно новый мир, где Вы сможете почувствовать себя искателем сокровищ, бесстрашным авантюристом, харизматичным детективом или же жертвой в чьей-то зловещей игре!",
    keywords:
        "Квесты Дубна, Квесты в Дубне, Запрудня, Дмитров, Дмитровский район, Кимры, Талдом,Талдомский район, Конаково, Княжево, Вербилки, московская обл. Москва, квест рум дубна, развлечения дубна, досуг",
};

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />
            {children}
            <Contacts />
            <Footer />
        </>
    );
}

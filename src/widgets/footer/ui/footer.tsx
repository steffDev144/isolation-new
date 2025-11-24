"use client"
import { navigations } from "@/shared/config/navigation"
import "./footer.scss"
import { Logo } from "@/shared/logo"
import { Menu } from "@/shared/ui/menu"
import { Telegram } from "@/shared/ui/svg/Social/Telegram"
import { Vk } from "@/shared/ui/svg/Social/Vk"
import { Whatsapp } from "@/shared/ui/svg/Social/Whatsapp"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Navigations } from "@/types/Navigations.types"

export function Footer() {
    const [filteredNavigations, setFilteredNavigations] = useState<Partial<Navigations>>({});

    useEffect(() => {
        const filtered = Object.fromEntries(
            Object.entries(navigations).filter(([key]) => key !== 'dubna')
        ) as Partial<Navigations>;

        setFilteredNavigations(filtered);
    }, []);

    return (
        <footer className="footer">
            <div className="footer__head">
                <div className="footer__head_logo">
                    <Logo />
                </div>
                <Menu
                    elementClass="footer"
                    navigations={filteredNavigations as Navigations}
                />
            </div>

            <div className="footer__wrapper">
                <div className="footer__wrapper_other">
                    <Link href="/policy" className="footer__wrapper_other-link">Политика конфиденциальности</Link>
                    <p className="footer__wrapper_other-text">
                        <span>@ 2010-2015 Isolation quest</span>
                        <span>Все права защищены</span>
                    </p>
                </div>

                <div className="footer__wrapper_links">
                    <Link href="/policy" className="footer__wrapper_links-item">
                        <Vk />
                    </Link>
                    <Link href="/policy">
                        <Telegram />
                    </Link>
                    <Link href="/policy">
                        <Whatsapp />
                    </Link>
                </div>
            </div>
            <div className="footer__image">
                <Image src="/images/footerIsolate.jpg" layout="fill" alt="isolateion" />
            </div>
        </footer>
    )
}
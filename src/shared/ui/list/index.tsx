"use client";

// import Image from "next/image";
import "./index.scss";
import { list } from "@/shared/config/list";

export function List() {
    return (
        <>
            {
                list.map((item) => (
                    <li key={item.id} className="adventures__list_item">
                        <div className="adventures__list_item-icon">
                            {item.imageList}
                        </div>
                        {/* <Image src={item.imageList} alt="ert" width={50} height={50} className="adventures__list_item-icon" /> */}
                        <p className="adventures__list_item-text">{item.textList}</p>
                    </li>
                ))
            }
        </>
    );
}

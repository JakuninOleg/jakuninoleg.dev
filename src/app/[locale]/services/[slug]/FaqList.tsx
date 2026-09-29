"use client";

import { useId, useState } from "react";
import styles from "./page.module.css";

type FaqItem = { title: string; text: string };

function Question({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}>
    <h3><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>{item.title}<span aria-hidden="true">{open ? "−" : "+"}</span></button></h3>
    <div id={id} className={styles.faqAnswer} aria-hidden={!open}><div><p>{item.text}</p></div></div>
  </div>;
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return <div>{items.map((item) => <Question key={item.title} item={item} />)}</div>;
}

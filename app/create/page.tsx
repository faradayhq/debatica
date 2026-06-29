"use client";

import { FormEvent, useState } from "react";
import { categories } from "@/lib/data";

export default function CreatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function submit(e: FormEvent) { e.preventDefault(); if (title.trim()) setSubmitted(true); }
  if (submitted) return <div className="page inner-page"><div className="success-state"><span>✓</span><p className="section-index">PREVIEW CREATED</p><h1>Your debate is ready.</h1><p>This prototype does not publish or save threads after refresh.</p><button className="primary-button" onClick={() => { setSubmitted(false); setTitle(""); setDescription(""); }}>Create another</button></div></div>;
  return (
    <div className="page inner-page create-page">
      <header className="page-intro"><span className="section-index">START SOMETHING</span><h1>Create a thread</h1><p>Make a clear statement people can agree or disagree with.</p></header>
      <form className="create-form" onSubmit={submit}>
        <label><span>Title <b>required</b></span><textarea value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} required placeholder="e.g. Public transport should be free in every city" /><small>{title.length}/140</small></label>
        <label><span>Category <b>required</b></span><select required defaultValue=""><option value="" disabled>Choose a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label><span>Description <em>optional</em></span><textarea className="description-input" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={400} placeholder="Add context to help people understand the question…" /><small>{description.length}/400</small></label>
        <div className="posting-rules"><p>Before previewing</p><ul><li>Write a claim, not an open-ended question</li><li>Keep it specific and understandable</li><li>Preview threads are not published or saved</li></ul></div>
        <button className="primary-button" type="submit">Preview thread <span>→</span></button>
      </form>
    </div>
  );
}

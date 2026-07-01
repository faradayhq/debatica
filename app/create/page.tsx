"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { categories, type Category } from "@/lib/data";
import { getOrCreateGuestIdentity } from "@/lib/guest-profile";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { createThread, writeErrorMessage } from "@/lib/supabase/data";

export default function CreatePage() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [authorName, setAuthorName] = useState("");
  const [createdId, setCreatedId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");

  function selectImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImageError("");
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
      setImageError("Choose a JPEG, PNG, WebP, or GIF image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("The image must be 5MB or smaller.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setThumbnailDataUrl(reader.result);
      setImageName(file.name);
    };
    reader.onerror = () => setImageError("Could not read that image. Try another file.");
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setThumbnailDataUrl("");
    setImageName("");
    setImageError("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !category || submitting || imageError) return;
    const identity = getOrCreateGuestIdentity();
    setAuthorName(identity.displayName);
    setSubmitError("");
    const client = getSupabaseBrowserClient();
    if (!client) {
      setSubmitError("Publishing is unavailable because the database is not configured.");
      return;
    }
    setSubmitting(true);
    try {
      const created = await createThread(client, {
        title: title.trim(),
        description: description.trim(),
        category,
        guestId: identity.id,
        thumbnailDataUrl: thumbnailDataUrl || undefined
      });
      setCreatedId(created.id);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(writeErrorMessage(error, "Could not publish this thread. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setTitle("");
    setDescription("");
    setCategory("");
    setCreatedId("");
    setSubmitError("");
    removeImage();
  }

  if (submitted) return <div className="page inner-page"><div className="success-state"><span>✓</span><p className="section-index">THREAD PUBLISHED</p><h1>Your debate is ready.</h1><p>Posted by <b>{authorName}</b>. It is now available in the latest thread list.</p><Link className="primary-button" href={`/thread/${createdId}`}>Open thread</Link><button className="primary-button" onClick={resetForm}>Create another</button></div></div>;
  return (
    <div className="page inner-page create-page">
      <header className="page-intro"><span className="section-index">START SOMETHING</span><h1>Create a thread</h1><p>Make a clear statement people can agree or disagree with.</p></header>
      <form className="create-form" onSubmit={submit}>
        <label><span>Title <b>required</b></span><textarea value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} required placeholder="e.g. Public transport should be free in every city" /><small>{title.length}/140</small></label>
        <label><span>Category <b>required</b></span><select required value={category} onChange={(event) => setCategory(event.target.value as Category)}><option value="" disabled>Choose a category</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Description <em>optional</em></span><textarea className="description-input" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={400} placeholder="Add context to help people understand the question…" /><small>{description.length}/400</small></label>
        <div className="image-upload-field">
          <div className="image-upload-heading"><span>Thumbnail <em>optional</em></span><small>One image · max 5MB</small></div>
          <div className="image-upload-row">
            {thumbnailDataUrl ? <img className="image-upload-preview" src={thumbnailDataUrl} alt="Selected thumbnail preview" /> : <span className="image-upload-placeholder" aria-hidden="true">IMG</span>}
            <div><input ref={imageInputRef} id="thread-image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={selectImage} /><label className="image-upload-button" htmlFor="thread-image">{thumbnailDataUrl ? "Change image" : "Choose image"}</label>{imageName && <p title={imageName}>{imageName}</p>}</div>
            {thumbnailDataUrl && <button type="button" className="image-remove-button" onClick={removeImage}>Remove</button>}
          </div>
          <p className="image-upload-note">By uploading an image, you confirm that you have the right to use it.</p>
          {imageError && <p className="form-error" role="alert">{imageError}</p>}
        </div>
        <div className="posting-rules"><p>Before publishing</p><ul><li>Write a claim, not an open-ended question</li><li>Keep it specific and understandable</li><li>Your thread will be visible as soon as it is published</li></ul></div>
        {submitError && <p className="form-error" role="alert">{submitError}</p>}
        <button className="primary-button" type="submit" disabled={submitting}>{submitting ? "Publishing…" : "Publish thread"} <span>→</span></button>
      </form>
    </div>
  );
}

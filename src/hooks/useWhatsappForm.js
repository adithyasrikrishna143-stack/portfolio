import { useCallback } from "react";

export default function useWhatsappForm(phone = "+919705945589") {
  return useCallback((e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = encodeURIComponent(form.elements[0].value);
    const email = encodeURIComponent(form.elements[1].value);
    const message = encodeURIComponent(form.elements[2].value);
    const url = `https://wa.me/${phone}?text=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;
    window.open(url, "_blank");
    return false;
  }, [phone]);
}

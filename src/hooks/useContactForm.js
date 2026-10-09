import { useState } from 'react';
import { normalizeContact, validateContact } from '../../shared/contact';
import { DEFAULT_COUNTRY } from '../../shared/countries';
import { sendContactMessage } from '../services/api';

const EMPTY_FORM = { name: '', email: '', country: DEFAULT_COUNTRY, phone: '', message: '', website: '' };

// The country picker changes which phone rules apply, so its errors live under `phone`.
const errorKeyFor = (field) => (field === 'country' ? 'phone' : field);

/** status: 'idle' | 'submitting' | 'success' | 'error' */
export default function useContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errorKey = errorKeyFor(name);
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[errorKey]) setErrors((current) => ({ ...current, [errorKey]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const contact = normalizeContact(values);
    const fieldErrors = validateContact(contact);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('submitting');
    setServerError('');
    try {
      await sendContactMessage({ ...contact, website: values.website });
      setValues({ ...EMPTY_FORM, country: contact.country });
      setStatus('success');
    } catch (error) {
      setErrors(error.fields ?? {});
      setServerError(error.message);
      setStatus('error');
    }
  };

  const reset = () => setStatus('idle');

  return { values, errors, status, serverError, handleChange, handleSubmit, reset };
}

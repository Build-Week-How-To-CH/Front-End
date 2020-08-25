import React from "react";

const initialFormValues = {
    title: '',
    category: '',
    content: ''
}

export default function HowToForm() {

    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formOpen, setFormOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const onInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
        setDisabled(checkForRequiredFields());
    }

    const checkForRequiredFields = () => {
        const { name, description, steps, category } = formValues;
        if (title !== '' && category !== '' && content !== '') {
            setError('');
            return false;
        }else {
            setError('Please fill out all required fields');
            return true;
        }
    }

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        setFormValues(initialFormValues);
    }

    const addHowTo = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/howtos', formValues) 
            .then(res => {
                console.log(res);
                setHowTos([...howTos, res.data]);
            })
            .catch(err => {
                console.log(err.response);
            })
        closeForm();
    }

  return (
    <div>
      <form>
        <label htmlFor="username">Title:&nbsp;</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={onInputChange}
        />
        <br />
        <br />
        <label htmlFor="category">Category:&nbsp;</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formValues.category}
          onChange={onInputChange}
        />
        <br />
        <br />
        <label htmlFor="steps">Content:&nbsp;</label>
        <textarea
          id="conent"
          name="content"
          value={formValues.content}
          onChange={onInputChange}
        />
        <br />
        <br />
        <button>Save Changes</button>&nbsp;
        <button>Cancel</button>
      </form>
    </div>
  );
}

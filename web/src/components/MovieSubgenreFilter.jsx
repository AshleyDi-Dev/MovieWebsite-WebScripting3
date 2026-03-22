// web/src/components/MovieSubgenreFilter.jsx

import { useState } from "react";

const MovieSubgenreFilter = ({ onFilterChange }) => {
    const [selected, setSelected] = useState([]);

    const handleCheckbox = (e) => {
        const value = e.target.value;
        const updated = selected.includes(value)
            ? selected.filter((s) => s !== value)
            : [...selected, value];
        setSelected(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(selected);
    }

    return (
        <div className='filters-container'>
            <form onSubmit={handleSubmit}>
                <h4>Subgenre</h4>
                <div className='filter-section'>
                    <label>
                        <input type="checkbox" name="subgenre" value="Psychological" onChange={handleCheckbox}/>
                        Psychological
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Occult" onChange={handleCheckbox}/>
                        Occult
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Elevated" onChange={handleCheckbox}/>
                        Elevated
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Folk Horror" onChange={handleCheckbox}/>
                        Folk Horror
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Supernatural" onChange={handleCheckbox}/>
                        Supernatural
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Zombie" onChange={handleCheckbox}/>
                        Zombie
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Social Thriller" onChange={handleCheckbox}/>
                        Social Thriller
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Cult" onChange={handleCheckbox}/>
                        Cult
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Witches" onChange={handleCheckbox}/>
                        Witches
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Pass It Forward" onChange={handleCheckbox}/>
                        Pass It Forward
                    </label>
                    <label>
                        <input type="checkbox" name="subgenre" value="Creature Feature" onChange={handleCheckbox}/>
                        Creature Feature
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <input type="submit" value="Apply" className='button' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MovieSubgenreFilter;
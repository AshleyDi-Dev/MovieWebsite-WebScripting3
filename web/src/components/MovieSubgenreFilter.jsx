// web/src/components/MovieSubgenreFilter.jsx

// @NOTE: I did get help from Claude with filtering, as I couldn't find anything on making the filters work in the lecture slides?

// Import Dependencies
import { useState } from "react";

// Recieves the onFilterChange from the AllMovies component
const MovieSubgenreFilter = ({ onFilterChange }) => {
    // Stores the list of currently checked subgenres
    const [selected, setSelected] = useState([]);

    // Runs when the status of the checkbox changes (check/uncheck)
    const handleCheckbox = (e) => {
        const value = e.target.value;
        // If the value is already selected, remove it. Otherwise, add it.
        const updated = selected.includes(value)
            ? selected.filter((s) => s !== value)
            : [...selected, value];
        setSelected(updated);
    };

    // Runs when the Apply button is clicked
    const handleSubmit = (e) => {
        // Prevents the form from refreshing the page on submit
        e.preventDefault();
        // Passes the selected subgenres up to the AllMovies component
        onFilterChange(selected);
    }

    // What is displayed on the screen
    return (
        <div className='filters-container'>
            {/* When the form is submitted, run handleSubmit */}
            <form onSubmit={handleSubmit}>
                <h4>Subgenres</h4>
                <p className="filter-text">Looking for a specific type of horror? Explore these horror subgenres! </p>
                <div className='filter-section'>
                    {/* A form containing all filters as checkbox items.
                    When clicked, run handleCheckbox*/}
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
                    {/* Submit button */}
                    <div className="filter-submit" style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <input type="submit" value="Apply" className='button' />
                    </div>
                </div>
            </form>
        </div>
    );
};

// Exported component 
export default MovieSubgenreFilter;
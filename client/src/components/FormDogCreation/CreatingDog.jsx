import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperaments } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import CreatingDogCSS from "./CreatingDog.module.css";

const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name = "Name is required, it should not contain numbers"
    }
    if(!form.min_height || !form.max_height) {
        errors.height = "Height is required"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "Weight is required"
    }
    if(!form.life_span) {
        errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    return errors
}

export default function CreatingDog () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const temperaments = useSelector((state) => state.temperaments)

    const [button, setButton] = useState(true)
    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [form, setButton])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(form));
        alert("Perro creado con éxito!");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
        navigate("/home")
    }

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el)
        })
    }


    return (
        <div className={CreatingDogCSS.container}>
            
            <Link className={CreatingDogCSS.home_btn} to="/home"><h3>Home</h3></Link>
            
            <div className={CreatingDogCSS.form_container}>
                <h1>Create your breed</h1>
            
            <form className={CreatingDogCSS.form} onSubmit={handleSubmit} id="form">
                <div className={CreatingDogCSS.name_lifespan_img_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.name}
                        name ="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Name..."
                        />
                    </div>

                <div className={CreatingDogCSS.error}>{errors.name && <p>{errors.name}</p>}</div>
                
                <div className={CreatingDogCSS.weight_height_container}>
                <div className={CreatingDogCSS.min_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.min_height}
                        name ="min_height"
                        onChange={(e) => handleChange(e)}
                        placeholder="Min height..."
                        />
                    </div>
                

                <div className={CreatingDogCSS.max_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.max_height}
                        name ="max_height"
                        onChange={(e) => handleChange(e)}
                        placeholder="Max height..."
                        />
                    </div>
                
                </div>
                <div className={CreatingDogCSS.error}>{errors.height && <p>{errors.height}</p>}</div>
                
                <div className={CreatingDogCSS.weight_height_container}>
                <div className={CreatingDogCSS.min_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.min_weight}
                        name ="min_weight"
                        onChange={(e) => handleChange(e)}
                        placeholder="Min weight..."
                        />
                    </div>
                

                <div className={CreatingDogCSS.max_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.max_weight}
                        name ="max_weight"
                        onChange={(e) => handleChange(e)}
                        placeholder="Max weight..."
                        />
                    </div>
                
                </div>
                <div className={CreatingDogCSS.error}>{errors.weight && <p>{errors.weight}</p>}</div>
                
                <div className={CreatingDogCSS.name_lifespan_img_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.life_span}
                        name ="life_span"
                        onChange={(e) => handleChange(e)}
                        placeholder="Expected lifespan... ex: 14 - 16"
                        />
                    </div>
                <div className={CreatingDogCSS.error}>{errors.life_span && <p>{errors.life_span}</p>}</div>
                
                <div className={CreatingDogCSS.name_lifespan_img_container}>
                    <input autoComplete="off"
                        type="text"
                        value={form.image}
                        name ="image"
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL..."
                        />
                </div>

                {/* <div className={CreatingDogCSS.h2_container}>
                    <h2>Select Temperaments</h2>
                </div> */}

                <div className={CreatingDogCSS.select_container}>
                    <select className={CreatingDogCSS.temps_select} onChange={handleSelect}>
                        <option disabled selected>Temperaments</option>
                        {temperaments.map(d => (
                    
                        <option value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>
                
                <br />

                

            </form>

            </div>

            <div className={CreatingDogCSS.create_btn_container}>
                <button className={CreatingDogCSS.create_btn} disabled={button} type="submit" form="form">Create</button>
            </div>

            <div className={CreatingDogCSS.temps_container}>
                <div className={CreatingDogCSS.temps_h1_container}>
                    <h1>Temperaments</h1>
                </div>
                <div className={CreatingDogCSS.selected_temps_container}>  
                    {form.temperaments.map(el =>
                        <div className={CreatingDogCSS.added_temp}>
                            <p>{el}</p>
                            <div className={CreatingDogCSS.temps_btn_overlay}>
                                <button className={CreatingDogCSS.temps_btn} onClick={() => handleDelete(el)}>
                                    <i class="gg-close-o"></i></button>
                            </div>
                        </div>
                    )}
                </div>
                      
            </div>
            
        </div>
    )
}
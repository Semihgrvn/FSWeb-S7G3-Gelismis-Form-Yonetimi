import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import axios from "axios";
import Kullanici from "./kullanicilar";
const MyForm = (props) => {

    const bosData = {
        name: "",
        email: "",
        password: "",
        termAccept: false
    }

    const [uye, setUye] = useState(bosData)
    const [uyeErrors, setUyeErrors] = useState(bosData);
    const [valid, setValid] = useState(false);

    const uyeFormSchema = Yup.object().shape({
        name: Yup.string().required("Ürün ismi boş bırakılamaz!").min(5, "İsim Soyisim minimum 5 karakter olmalı!"),
        email: Yup.string().email("Geçerli bir email giriniz."),
        password: Yup.string().required("Geçerli bir şifre giriniz!").min(8, "Şifre en az 8 karakter olmalıdır!"),
        termAccept: Yup.boolean().oneOf([true], "The terms and conditions must be accepted.")
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        Yup.reach(uyeFormSchema, name)
            .validate(value)
            .then((valid) => {
                setUyeErrors({ ...uyeErrors, [name]: "" });
            })
            .catch((err) => {
                setUyeErrors({ ...uyeErrors, [name]: err.errors[0] });
            });

        if (name == "email" && value == "waffle@syrup.com") {
            setUyeErrors({ ...uyeErrors, [name]: "Bu Email adresi zaten kayıtlı!" });
        }

        setUye({ ...uye, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", uye)
            .then((res) => {
                console.log(res)
                setUye({ ...res.data });
            })
    }

    const inputCheckboxHandler = (e) => {
        const { checked } = e.target;
        uye.termAccept = checked;
        setUye({ ...uye });
    };

    useEffect(() => {
        uyeFormSchema.isValid(uye).then((vld) => setValid(vld));
    }, [uye]);

    return (
        <Form>
            <FormGroup>
                <Label for="name"
                >
                    İsim Soyisim

                    <Input
                        data-cy="isim-soyisim"
                        id="name"
                        name="name"
                        placeholder="İsim Soyisim giriniz"
                        type="text"
                        value={uye.name}
                        onChange={handleChange}
                        invalid={!!uyeErrors.name}

                    />
                </Label>
                <FormFeedback>{uyeErrors.name}</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Label for="email">
                    E-mail

                    <Input
                        id="email"
                        name="email"
                        placeholder="Email giriniz"
                        type="email"
                        value={uye.email}
                        onChange={handleChange}
                        invalid={!!uyeErrors.email}
                    />
                </Label>
                <FormFeedback>{uyeErrors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    Parola

                    <Input
                        id="password"
                        name="password"
                        placeholder="Şifre giriniz"
                        type="password"
                        value={uye.password}
                        onChange={handleChange}
                        invalid={!!uyeErrors.password}
                    />
                </Label>
                <FormFeedback>{uyeErrors.password}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    id="termAccept"
                    type="checkbox"
                    name="termAccept"
                    value={uye.termAccept}
                    onChange={inputCheckboxHandler}
                />
                <Label style={{ "marginLeft": "10px" }}>
                    Kullanıcı Koşulları..
                </Label>

            </FormGroup>
            <Button onClick={handleSubmit} disabled={!valid}>
                Gönder
            </Button>

            <Kullanici kullanici={uye} valid={valid} />

        </Form>
    )
}
export default MyForm;
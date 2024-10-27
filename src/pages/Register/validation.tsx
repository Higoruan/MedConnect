export const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validateForm = (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
): string[] => {
    const errors: string[] = [];

    if (!fullName) errors.push('Nome completo é obrigatório.');
    if (!email) {
        errors.push('E-mail é obrigatório.');
    } else if (!validateEmail(email)) {
        errors.push('Formato de e-mail inválido.');
    }
    if (!password) errors.push('Senha é obrigatória.');
    if (password.length < 6) errors.push('A senha deve ter pelo menos 6 caracteres.');
    if (password !== confirmPassword) errors.push('As senhas não coincidem.');

    return errors;
};
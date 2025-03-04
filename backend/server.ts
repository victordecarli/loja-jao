import app from '@/app'
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
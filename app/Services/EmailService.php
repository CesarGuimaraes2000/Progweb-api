<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;

class EmailService
{
    public function sendConfirmationMail($name,$codigo,$email)
    {
        Mail::raw("Olá {$name}, seu código de confirmação para mudança de  senha é: {$codigo} \n
        Essa é uma mensagem gerada automaticamente, se você não reconhece o pedido de mudança de
         email desconsidere esta mensagem",function (Message $message) use ($email){
            $message->to($email)
                    ->subject('Pedido de alteração de senha')
                    ->from('MagnetBR@magnet.com');
        });
    }
}
export class MessageService {
  text: string = '';
  subText: string = '';

  showMessage(text: string, subText: string, duration: number) {
    this.text = text;
    this.subText = subText;
    const messageClass = document.getElementsByClassName('message')[0].classList;

    messageClass.toggle('opacity-0');
    setTimeout(() => {
      messageClass.toggle('opacity-0');
    }, duration);
  }
}

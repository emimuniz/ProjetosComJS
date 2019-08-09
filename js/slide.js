export default class Slide{

    constructor(slide, wrapper){
        //selecionando 
        //criando um objeto pegando a distancia
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.dist = { finalPosition: 0, startX: 0, movement: 0 }
    }

    transition(active){
        this.slide.style.transition = active ? 'transform .3s' : '';
    }

    //movendo o slide
    //salvando a distancia
    moveSlide(distX){
        this.dist.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }


    //guardando o movimento no objeto 
    //aumentando o movimento
    updatePosition(clientX){
        this.dist.movement = (this.dist.startX - clientX) * 1.6;
        return this.dist.finalPosition - this.dist.movement;
    }


    //tirando o comportamento padrão da imagem
    //adiciona o evento mousemove ao clicar
    onStart(event){
        //tipo do movimento
        let movetype;
        if(event.type === 'mousedown'){
            event.preventDefault();
            this.dist.startX = event.clientX;
            movetype = 'mousemove';
        }else{
            this.dist.startX = event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        this.wrapper.addEventListener(movetype, this.onMove);
        this.transition(false);
    }

    //remover o mover
    //guardando o valor da distancia
    onEnd(event){
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.dist.finalPosition = this.dist.movePosition;
        this.transition(true);
        this.changeSlideOnEnd();

    }

    //mude os slides quando acabar
    changeSlideOnEnd(){
        if(this.dist.movement > 120 && this.index.next !== undefined){
            this.activeNextSlide();
        }else if(this.dist.movement < -120 && this.index.prev !== undefined) {
            this.activePrevSlide();
        }else{
            this.changeSlide(this.index.active)
        }
        console.log(this.dist.movement)
    }

    //adicionar o evento mover
    //adicionando a posição final
    onMove(event){
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);
    }

    //adicionar eventos nos wrapper ao clicar
    // só vai ativar o mousemove quando for desclicado
    addSlideEvents(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);

    }

    //fazer todos os binds nos eventos
    bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    //Slides config 

    slidePosition(slide){
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth)/2;
        return -(slide.offsetLeft - margin);
    }

    slideConfig(){
        // desconstruindo o array
        this.slideArray = [...this.slide.children].map((element) => {
            const position = this.slidePosition(element);
            return {
                position,
                element
            }
        }); 
    }

    //valores do anterior, do ativo , e do proximo
    slidesIndexNav(index){
        const last = this.slideArray.length - 1;
        console.log(last);
        this.index = {
            prev: index ? index - 1 : undefined,
            active: index, 
            next: index === last ? undefined : index + 1,
        }
    }

    //mudando a posição
    changeSlide(index){
        const activeSlide = this.slideArray[index];
        this.moveSlide(activeSlide.position);
        this.slidesIndexNav(index);
        this.dist.finalPosition = activeSlide.position;
    }

    activePrevSlide(){
        if(this.index.prev !== undefined) this.changeSlide(this.index.prev);
        
    }

    activeNextSlide(){
        if(this.index.next !== undefined) this.changeSlide(this.index.next);
        
    }

    //quando iniciar adiciona os eventos
    //Faz o Bind dos eventos
    init(){
        this.bindEvents();
        this.addSlideEvents();
        this.slideConfig();
        this.transition(true);
        return this;
    }
}
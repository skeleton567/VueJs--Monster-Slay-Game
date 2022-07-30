
function randValue(num){
    return Math.floor(Math.random() * num);
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            rounds: 0,
            battleLog: [],
            winner: null

        }
    },
    methods:{
        attack() {
            this.rounds++;
            const normalAttack = randValue(6);
            let counterAttack = randValue(8);
            this.monsterHealth -= normalAttack;
            this.playerHealth -= counterAttack;
            this.addLogMessage('Player', 'attack', normalAttack);
            this.addLogMessage('Monster', 'attack', counterAttack);

        },
        strongAttack(){
            this.rounds++;
            const specialAttack = randValue(25);
            let counterAttack = randValue(8);
            this.monsterHealth -= specialAttack;
            this.playerHealth -= counterAttack;
            this.addLogMessage('Player', 'attack', specialAttack);
            this.addLogMessage('Monster', 'attack', counterAttack);
        },
        heal(){
            this.rounds++;
           const playerHeal = randValue(4);

            if (this.playerHealth + playerHeal > 100){
                this.playerHealth = 100; 
            } else{
                this.playerHealth += playerHeal;
            } 
            let counterAttack = randValue(8);
            this.playerHealth -= counterAttack;
            this.addLogMessage('Player', 'heal', playerHeal);
            this.addLogMessage('Monster', 'attack', counterAttack);
        },
        surrender(){
            this.playerHealth = 0;
        },
        newGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.clearLog()
            this.rounds = 0;
            this.winner = null;
        },
        clearLog(){
            this.battleLog = [];
        },
        addLogMessage(who, what, value){
            this.battleLog.unshift(`${who} ${what}s ${value}`);
        }

    },
    computed:{
        monsterBarstyle(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarstyle(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth+'%'};
        },
        mayUseAttack(){
            return this.rounds % 3 !== 0;
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0){
                this.winner = 'monster';
            } 
        },
        monsterHealth(value){
            if(value <= 0){
                this.winner = 'player';
            } 
        }
    }
})


app.mount('#game');